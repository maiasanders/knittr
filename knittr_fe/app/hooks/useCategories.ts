import { useEffect, useState } from "react"
import { Category } from "../helpers/apiResponseTypes"
import categoryService from "../services/categoryService"

const useCategories = () => {

    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        const getCats = async () => {
            await categoryService.getAll().then(r => setCategories(r.data))
        }
        getCats()
    }, [])

    const addCategory = async (categoryName: string) => {
        let newCat: Category | null = null;
        categoryName = categoryName.trim()
        if (categoryName.length > 0) {
            newCat = await categoryService.add({ categoryName })
                .then(r => {
                    setCategories([...categories, r.data])
                    return r.data
                })
        }
        return newCat
    }

    return { addCategory, categories }
}

export default useCategories
