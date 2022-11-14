import mongoose from "mongoose";

const Tickets = mongoose.Schema({
    id: {
        type: String,
        required: false,
    },
    alert_id: {
        type: String,
        required: false,
    },
    demisto_id: {
        type: String,
        required: false,
    },
    ticket_name: {
        type: String,
        required: false,
    },
    tenant: {
        type: String,
        required: false,
    },
    severity: {
        type: String,
        required: false,
    },
    create_time: {
        type: Date,
        required: false,
    },
    closed_time: {
        type: Date,
        required: false,
    },
    is_closed: {
        type: Boolean,
        required: false,
    },
    owner_id: {
        type: Object,
        required: false,
    },
    details: {
        type: String,
        required: false,
    },
    created_by: {
        type: String,
        required: false,
    },
    parent_demisto_id: {
        type: String,
        required: false,

    },
    ticket_owners: {
        type: Object,
        required: false,
    },
    update_time: {
        type: Date,
        required: false,
    },

    update_by: {
        type: String,
        required: false,
    },

    // is_union: {
    //     type: Boolean,
    //     required: false,
    //     default: false
    // },

    group_name: {
        type: String,
        required: false,
    },

    comments: [
        {
            hight_text: {
                type: String,
                required: false,
            },
            comment: {
                type: String,
                required: false,
            },
            update_date: {
                type: String,
                required: false,
            },
            type: {
                type: String,
                required: false,
            },
            user: {
                type: String,
                required: false,
            },
            status: {
                type: String,
                required: false
            }
        }
    ],
    // update model

    ques_ans: [
        {
            name_q: {
                type: String,
                required: false,
            },
            code_question: {
                type: String,
                required: false,
            },
            content: {
                type: String,
                required: false,
            },
            user_edit: {
                type: String,
                required: false,
            },
            code_q:
            {
                name_t: {
                    type: String,
                    required: false,
                },
                code_t: {
                    type: String,
                    required: false,
                },
                details: {
                    type: String,
                    required: false,
                },
                params: [
                    {
                        type: Object,
                        require: true,
                    }
                ],
                answers: [
                    {
                        type: Object,
                        required: false,
                    }
                ]
            }
        }
    ]
})


export default mongoose.model('Tickets', Tickets)
