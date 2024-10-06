const db = require("../utils/database");
const moment = require("moment");

class CommonService {
    async submitForm(data) {
        try {
            let { dateRange, model, wheels, vehicleType, name } = data;
            wheels = wheels.toString()
            console.log(data, 'data....')

            if(!dateRange || !model || !wheels || !vehicleType || !name) {
                return {
                    status: false,
                    message: "Incomplete data",
                    data: null
                }
            }

            const first_name = name?.first,
                    last_name = name?.last,
                    start_date = dateRange?.startDate,
                    end_date = dateRange?.endDate;

            const createOrder = await db.execute(`
                insert into orders 
                (first_name,last_name,wheels,vehicleType, model, start_date,end_date,created_at,is_deleted)
                values
                (?,?,?,?,?,?,?,?,?)
            `, [first_name, last_name, wheels, vehicleType, model, start_date, end_date, Date.now(), '0']);

            return {
                status: true,
                message: "Order Placed Successfully",
                data: null
            }
        } catch(e) {
            console.log(e)
            return {
                status: false,
                message: "Something went wrong",
                data: null
            }
        }
    }
    
    async getVehicleType(data) {
        try {
            let type_result;

            const getTypes = await db.execute(`
               select Type,type_name from vehicle_type where is_deleted<>'1' 
            `);

            if(getTypes && getTypes[0]?.length !=0) {
                type_result = {
                    '2': [],
                    '4': []
                }

                getTypes[0]?.forEach((item) => {
                    if(item?.Type == '2') {
                        type_result['2'].push(item?.type_name)
                    } else if(item?.Type == '4') {
                        type_result['4'].push(item?.type_name);
                    }
                })


                return {
                    status: true,
                    message: "success",
                    data: type_result
                }
            }

            return {
                status: false,
                message: "No data found",
                data: null
            }
        } catch(e) {
            console.log(e)
            return {
                status: false,
                message: "Something went wrong",
                data: null
            }
        }
    }
    
    async getVehicleModels(data) {
        try {
            let models;

            const getTypes = await db.execute(`
               select type_name from vehicle_type 
            `);

            if(!getTypes || getTypes[0]?.length == 0) {
                return {
                    status: false,
                    message: "No data",
                    data: null
                }
            }

            const getModels = await db.execute(`
                select vt.type_name,vm.model_name
                    from vehicle_type as vt
                    left join vehicle_models as vm
                    on vt.id = vm.type_id
            `);

            if(getModels && getModels[0]?.length !=0) {
                models = getModels[0]?.reduce((acc, curr) => {
                    const { type_name, model_name } = curr; // Destructure type and name
                    // If the type doesn't exist in the accumulator, create it
                    if (!acc[type_name]) {
                      acc[type_name] = [];
                    }
                    // Push the name into the appropriate type array
                    acc[type_name].push(model_name);
                    return acc; // Return the accumulator for the next iteration
                }, {}); // Start with an empty object


                return {
                    status: true,
                    message: "success",
                    data: models
                }
            }

            return {
                status: false,
                message: "No data found",
                data: null
            }
        } catch(e) {
            console.log(e)
            return {
                status: false,
                message: "Something went wrong",
                data: null
            }
        }
    }
}

module.exports = CommonService;
