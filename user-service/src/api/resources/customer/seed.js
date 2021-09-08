import faker from "faker";
import { Customer } from "./customer.model";

/** create fake user then seed database */
export const seedUser = async () => {
  try {
    /** check if already populated to avoid seeding the db every time */
    const existingUser = await Customer.find();
    if (existingUser.length > 0) {
      return;
    }

    const user = new Customer({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.phoneNumber()
    });

    await Customer.deleteMany();

    /** create new database entry for every user */
   user.save();
    console.log("User has been Populated!");
  } catch (error) {
    console.log(error);
  }
};
