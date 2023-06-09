import { Repository } from "typeorm";
import { User } from "../entities";

export type IUserRepo = Repository<User>