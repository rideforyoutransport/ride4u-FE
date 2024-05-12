export const dynamicForm = {
    templateName:"RIDE4UTRANSPORT Template 1",
    elements:[

    {
        label:"Name",
        name:"name",
        type:"Text",
        required:true,
        maxLength:10

    },
    {
        label:"Product Image",
        name:"p_name",
        type:"file",
        required:true,
        maxLength:10

    },
    
    {
        label:"Date",
        name:"date",
        type:"Date",
        required:true,
        maxLength:10

    }
    ,{
        label:"Phone",
        name:"phone",
        type:"Number",
        required:true,
        maxLength:10
    },
    {
        label:"Options",
        name:"opt",
        type:"select",
        required:true,
        maxLength:10,
        options:['One' ,'Two' ,'Three' ,'Four' ,'Five']
    },
    {
        label:"Required",
        name:"c_name",
        type:"checkbox",
        required:true,
        maxLength:10

    }
    
]};

