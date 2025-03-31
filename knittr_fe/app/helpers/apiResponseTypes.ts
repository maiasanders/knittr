export interface Size {
    sizeId: number;
    name: string;
    ageRange: string;
}

type YarnName = 'Fingering (Lace Weight)' | 'Sock' | 'Fingering (Super Fine Weight)' | 'Baby (Super Fine)' | 'Sport' | 'Baby (Fine)' | 'DK' | 'Light Worsted' | 'Worsted' | ' Afghan' | 'Aran' | 'Chunky' | 'Craft' | 'Rug' | 'Super Bulky' | 'Roving (Super Bulky)' | 'Jumbo' | 'Roving (Jumbo)'

export interface Yarn {
    yarnId: number;
    name: YarnName;
}

export interface Image {
    imageId: number;
    imageLink: string;
    patternId: number;
    submittedBy: User;
    desc: string;
}

export interface ImageDto {
    imageLink: string;
    desc: string;
    patternId: number;
}

export interface User {
    username: string;
    password?: string;
    userId: number;
}

export interface LoginDto {
    username: string;
    password: string;
}

export interface Pattern {
    patternId: number;
    name: string;
    author: User;
    desc: string;
    isPublic: boolean;
    categories: Category[];
    defaultImage: Image;
    variants: Variant[];
}

export interface PatternDto {
    name: string;
    desc: string;
    catIds: number[];
}

export interface Category {
    categoryId: number;
    category_name: string;
}

export interface CategoryDto {
    categoryName: string;
}

export type loadingStatus = 'Error' | boolean;

export interface Project {
    projectId: number;
    makerId: number;
    pattern: Pattern;
    variant: Variant;
    yarnsUsed?: string;
    currentRow: number;
    isCompleted: boolean;
    notes: Note[];
    steps: Step[];
}

export interface ProjectStartDto {
    variantId: number;
    isTemplate: boolean;
}

export interface Variant {
    variantId: number;
    size: Size;
    yarn: Yarn;
    patternId: number;
}

export interface VariantDto {
    sizeId: number;
    yarnId: number;
    patternId: number;
}

export interface Note {
    noteId: number;
    body: string;
    projectId: number;
}

export interface Step {
    stepId: number;
    variantId: number;
    title: string;
    stepNum: number;
    rows: Row[];
}

export interface StepDto {
    variantId: number;
    title: string;
    stepNum: number;
    rows: RowDto[];
}

export interface RowDto {
    directions: string;
    rowNum: number;
}

export interface Row {
    rowId: number;
    stepId: number;
    directions: string;
    rowNum: number;
}

export interface Auth {
    username: string,
    token: string
}
