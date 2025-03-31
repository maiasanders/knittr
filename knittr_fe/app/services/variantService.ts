import { VariantDto } from "../helpers/apiResponseTypes";
import apiAccess from "./axiosConfig";

export default {
    addVariant(variant: VariantDto) {
        return apiAccess.post("/variants", variant);
    }
}
