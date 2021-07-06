
import * as amqp from "amqplib/callback_api"

export class RabbitReceiver{
    constructor(queue:string,handler:(queue:string,message:string) => void){
        const url = process.env.RABBIT_MQ || 'amqp://guest:guest@localhost:5672/'
        amqp.connect(url, function(error0, connection) {
    if (error0) {
        console.log(error0)
        //throw error0;
    }

    connection.createChannel(function(error1, channel) {
        if (error1) {
            console.log("Rabbit Receiver:",error1)
        }

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(`Waiting for messages in ${queue}`);

        channel.consume(queue, function(msg) {
            console.log(`Rabbit Receiver: ${msg?.content.toString()}`);
 
            //handler(queue,msg);
        }, {
            noAck: true
        });
    });
});
    }
}
