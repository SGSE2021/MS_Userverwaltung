
import * as amqp from "amqplib/callback_api"

export class RabbitSender{
    constructor(){

    }

    public send(queue:string,message:string){
        var connected = true;
        const url = process.env.RABBIT_MQ || 'amqp://guest:guest@localhost:5672/'
        amqp.connect(url, function(error0, connection) {
            if (error0) {
                connected=false;
                console.log("Rabbit: Conencting to rabbitmq failed");
            }
            connection.createChannel(function(error1, channel) {
              if (error1) {
                connected=false;
                console.log("Rabbit: Conencting to channel failed");
              }
          
              channel.assertQueue(queue, {
                durable: false
              });
          
              channel.sendToQueue(queue, Buffer.from(message));
              console.log(`Rabbit:  Sent:${message}`);
          
          
          
            });
          });
    }

}
