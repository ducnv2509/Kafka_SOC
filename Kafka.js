import {Kafka} from 'kafkajs';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import pkg from 'joi';
import Alert from './models/Alert.js';
import myLogger from './winstonLog/winston.js';
import Ticket from './models/Ticket.js';
const { exist } = pkg;
dotenv.config();


const kafka = new Kafka({
    brokers: ['10.14.132.44:9092']
})

// const kafka = new Kafka({
//     brokers:
//         ['10.14.132.44:9092']
// })

// let client = new kafka.client("10.14.132.44:9092")
// const consumer = kafka.consumer(
//     { groupId: 'consumer-group', rackId: '1' });
// const topic = 'helion';

const consumer = kafka.consumer({ groupId: 'consumer-group' })

await consumer.connect()
await consumer.subscribe({ topic: 'helion', fromBeginning: true })

const dbname = process.env.SOC_API_DBNAME;
const host = process.env.SOC_API_HOSTDB;
const port = process.env.SOC_API_PORTDB;
const user = process.env.SOC_API_USERDB;
const pass = process.env.SOC_API_PASSWORDDB;
const dburl = `mongodb://${user}:${pass}@${host}:${port}/${dbname}?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&authSource=${dbname}&authMechanism=SCRAM-SHA-256`

mongoose.connect(dburl,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) {
            myLogger.info("%o", err)
        } else {
            myLogger.info("OK")
        }
    })
myLogger.info(dburl)
await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        let a = JSON.parse(message.value)
        // console.log(a);
        if (a.event_type == 'alert_created') {
            let alertModel = new Alert({
                id: a.data.alert_id,
                alert_name: a.data.alert_name,
                tenant: a.data.tenant,
                owner_id: a.data.owner_id,
                is_ticket: a.data.is_ticket,
                create_time: a.data.create_time,
                reviewed_time: a.data.reviewed_time,
                is_closed: a.data.is_closed,
                alert_detail: a.data.alert_detail,
                alert_end_time: a.data.alert_end_time,
                alert_log_source_id: a.data.alert_log_source_id,
                alert_metadata: a.data.alert_metadata,
                alert_num_events: a.data.alert_num_events,
                alert_score: a.data.alert_score,
                alert_start_time: a.data.alert_start_time,
                closing_reason: a.data.closing_reason,
                direction_type: a.data.direction_type,
                data_type: 'ipaddress',
                data: 'comming',
                alert_id: a.data.alert_id,
                rule_name: a.data.description,
                create_ticket_time: a.data.create_ticket_time
            })
            alertModel.save();
            // console.log(alertModel)
            myLogger.info('This is log alert_created %o', message.value.toString())

            // exist();
        }
        else if (a.event_type == 'alert_updated') {
            // console.log(alertModel)
            await Alert.findOneAndUpdate(
                { id: a.data.alert_id }, {

                alert_name: a.data.alert_name,
                alert_rule_names: a.data.alert_rule_names,
                alert_src_hosts: a.data.alert_src_hosts,
                alert_dest_hosts: a.data.alert_dest_hosts,
                tenant: a.data.tenant,
                owner_id: a.data.owner_id,
                is_ticket: a.data.is_ticket,
                create_time: a.data.create_time,
                reviewed_time: a.data.reviewed_time,
                is_closed: a.data.is_closed,
                alert_detail: a.data.alert_detail,
                alert_end_time: a.data.alert_end_time,
                alert_log_source_id: a.data.alert_log_source_id,
                alert_metadata: a.data.alert_metadata,
                alert_num_events: a.data.alert_num_events,
                alert_score: a.data.alert_score,
                alert_start_time: a.data.alert_start_time,
                closing_reason: a.data.closing_reason,
                direction_type: a.data.direction_type,
                data_type: 'ipaddress',
                data: 'comming',
                alert_id: a.data.alert_id,
                rule_name: a.data.description,
                create_ticket_time: a.data.create_ticket_time
            }, { new: true }
            )
            myLogger.info('This is log alert_updated %o', message.value.toString())
            // exist();
        } else {
            console.log({
                value: message.value.toString(),
            })
            exist();
        }
        if (a.event_type == 'ticket_created') {
            let ticketModel = new Ticket({
                id: a.data.id,
                alert_id: a.data.alert_id,
                demisto_id: a.data.demisto_id,
                ticket_name: a.data.ticket_name,
                tenant: a.data.tenant,
                severity: a.data.severity,
                create_time: a.data.create_time,
                closed_time: a.data.closed_time,
                is_closed: a.data.is_closed,
                owner_id: a.data.owner_id,
                details: a.data.details,
                created_by: a.data.created_by,
                parant_demisto_id: a.data.parant_demisto_id,
                ticket_owners: a.data.ticket_owners,
                update_time: a.data.update_time
            })
            ticketModel.save();
            // console.log(ticketModel);
            myLogger.info('This is log ticket_created %o', message.value.toString())

            // exist();
        }
        // // // 
        else if (a.event_type === 'ticket_updated') {
            await Ticket.findOneAndUpdate(
                { id: a.data.id }, {
                alert_id: a.data.alert_id,
                demisto_id: a.data.demisto_id,
                ticket_name: a.data.ticket_name,
                tenant: a.data.tenant,
                severity: a.data.severity,
                create_time: a.data.create_time,
                closed_time: a.data.closed_time,
                is_closed: a.data.is_closed,
                owner_id: a.data.owner_id,
                details: a.data.details,
                created_by: a.data.created_by,
                parant_demisto_id: a.data.parant_demisto_id,
                ticket_owners: a.data.ticket_owners,
                update_time: a.data.update_time
            }, { new: true }
            )
            myLogger.info('This is log ticket_updated %o', message.value.toString())
            // console.log({
            //     value: message.value.toString(),
            // })
            // exist();
        }
    },
})