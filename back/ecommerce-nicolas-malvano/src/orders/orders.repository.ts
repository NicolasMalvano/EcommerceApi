import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { Repository } from "typeorm";
import { OrderDetails } from "./entities/orderDetail.entity";
import { User } from "../users/entities/users.entity";
import { Products } from "../products/entities/products.entity";
import { createOrderDTO } from "./entities/dtos/orders.dto";

@Injectable()

export class OrdersRepository{
    constructor(
        @InjectRepository(Order) private dbOrdersRepository: Repository<Order>,
        @InjectRepository(OrderDetails) private dbOrdersDetailsRepository: Repository<OrderDetails>,
        @InjectRepository(User) private dbUsersRepository: Repository<User>,
        @InjectRepository(Products) private dbProductsRepository: Repository<Products>
    ){}

    async getOrders(): Promise<Order[]>{
        const orders = this.dbOrdersRepository.find({
            relations: {
                user: {
                    order: {
                        orderDetails: true,
                    }
                }
            }
        });
        if((await orders).length === 0) throw NotFoundException;
        return orders;
    }

    async getOrderById(id: string): Promise<Order> {
        const order =  await this.dbOrdersRepository.findOne({
            where: {id},
            relations: {
                orderDetails: {
                    products:true
                },
            },
        });
        if(!order) throw new NotFoundException;

        return order;
    }

    async addOrder(newOrderData: createOrderDTO): Promise<Order[]> {

        const { userId, products} = newOrderData;

        const user = await this.dbUsersRepository.findOneBy({id: userId});
        if(!user) throw new NotFoundException;


        const order = new Order();
        order.date = new Date();
        order.user = user;
        const newOrder = await this.dbOrdersRepository.save(order);

        const productsArray = await Promise.all(
            products.map(async (element) => {
                const product = await this.dbProductsRepository.findOneBy({id: element.id})
                if(!product)throw new NotFoundException;
                
                await this.dbProductsRepository.update(
                    {id: element.id},
                    {stock: product.stock - 1},
                );

                return product;
            })
        );

        const total = productsArray.reduce(
            (suma, product) => suma + Number(product.price), 0,
        );

        const orderDetail = new OrderDetails();
        orderDetail.price = Number((total).toFixed(2));
        orderDetail.products = productsArray;
        orderDetail.order = newOrder;
        await this.dbOrdersDetailsRepository.save(orderDetail);

        const orderResponse =  await this.dbOrdersRepository.find({
            where: { id: newOrder.id },
            relations: {
                orderDetails: {
                    products: true
                }
            }
        });
        if(!orderResponse) throw new Error('Orden no encontrada')
        return orderResponse;
    
    }

    async deleteOrder(id: string){
        //Encontrar la orden y el detalle de orden asociado. Eliminar a ambos
       const order = await this.dbOrdersRepository.findOne({
        where: { id },
        relations: ['orderDetails'],
        });

        if (!order) throw NotFoundException;

        await this.dbOrdersDetailsRepository.remove(order.orderDetails);
        await this.dbOrdersRepository.remove(order);

        return `Orden con id ${id} borrada correctamente`
    }

}