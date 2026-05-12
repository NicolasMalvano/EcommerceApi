import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { createOrderDTO } from './entities/dtos/orders.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
    constructor(
        private dbOrdersRepository: OrdersRepository,
     ){}

  async getOrders(): Promise<Order[]>{
    return await this.dbOrdersRepository.getOrders()
  }

  async create(createOrderDto: createOrderDTO): Promise<Order[]>  {
    return await this.dbOrdersRepository.addOrder(createOrderDto) ;
  }


  async findOneOrder(id: string): Promise<Order>  {
    return await this.dbOrdersRepository.getOrderById(id);
  }

  async deleteOrder(id: string){
    return this.dbOrdersRepository.deleteOrder(id);
  }

}
