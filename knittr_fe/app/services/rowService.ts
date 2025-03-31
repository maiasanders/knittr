import { Row } from "../helpers/apiResponseTypes";
import apiAccess from "./axiosConfig";

export default {
    createRow(row: Row) {
        return apiAccess.post("/rows", row)
    }
}
