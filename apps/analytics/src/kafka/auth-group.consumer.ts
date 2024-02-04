import { ConsumerService } from "@app/common";
import { Injectable, OnModuleInit } from "@nestjs/common";

@Injectable()
export class AuthGroupConsumer implements OnModuleInit {
    constructor(private readonly consumerService: ConsumerService) { }

    onModuleInit() {
        this.consumerService.consume(
            { topics: ['auth-logs'], fromBeginning: true },
            {
                eachMessage: async ({ topic, partition, message }) => {
                    console.log('Received message', {
                        value: message.value.toString(),
                        topic: topic.toString(),
                        partition: partition.toString(),
                        timestamp: new Date(parseInt(message.timestamp)).toISOString(),
                    });
                },
            },
        );
    }
}