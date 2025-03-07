import sizeService from "../services/sizeService";
import yarnService from "../services/yarnService";
import type { Route } from "./+types/createVariant"
import { Form } from "react-router";
import { redirect } from "react-router-dom";
// import { useState } from "react";
import { VariantDto, Yarn } from "../helpers/apiResponseTypes";
import variantService from "../services/variantService";
import projectService from "../services/projectService";

export async function clientLoader() {
    const yarns = await yarnService.getYarns().then(r => r.data);
    const sizes = await sizeService.getSizes().then(r => r.data);

    return { yarns, sizes }
}

export async function clientAction({ params, request }: Route.ClientActionArgs) {
    const formData = await request.formData()
    const reqData = Object.fromEntries(formData)
    const dto: VariantDto = {
        patternId: parseInt(params.id),
        yarnId: parseInt(reqData.yarnId),
        sizeId: parseInt(reqData.sizeId)
    }
    const result = await variantService.addVariant(dto).then(r => r.data)
    // const dto = {
    //     variantId: result.variantId
    // }

    const newProj = await projectService.create({
        variantId: result.variantId,
        isTemplate: true
    }).then(r => r.data)
    return redirect(`/variants/${result.variantId}/template`)
}

export default function CreateVariant({ loaderData }: Route.ClientLoaderArgs) {
    const { yarns, sizes } = loaderData
    // const [selectedYarn, setSelectedYarn] = useState<Yarn>();

    return (
        <Form method="post">
            <select className="form-select" aria-label="Yarn Selection" name="yarnId">
                <option selected>Select yarn</option>
                {yarns.map(y => (<option key={y.yarnId} value={y.yarnId}>{y.name}</option>))}
            </select>
            <select className="form-select" aria-label="Size Selection" name="sizeId">
                <option selected>Select size</option>
                {sizes.map(s => (<option key={s.sizeId} value={s.sizeId}>{s.name}</option>))}
            </select>
            <button type="submit" className="btn btn-primary">Start knitting!</button>
        </Form>
    )
}
