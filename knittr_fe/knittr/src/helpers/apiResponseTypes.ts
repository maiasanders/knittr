export interface Size {
    sizeId: number;
    name: string;
    ageRange?: string;
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
    sizes: Size[];
    yarns: Yarn[];
}

export interface Category {
    categoryId: number;
    category_name: string;
}

export type loadingStatus = 'Error' | boolean;

export interface Project {
    projectId: number;
    makerId: number;
    pattern: Pattern;
    yarn?: Yarn;
    size: Size;
    yarnsUsed?: string;
    currentRow: number;
    isCompleted: boolean;
    notes: Note[];
    steps: Step[];
}

export interface Note {
    noteId: number;
    body: string;
    projectId: number;
}

export interface Step {
    stepId: number;
    patternId: number;
    sizeId: number;
    yarnId: number;
    title: string;
    stepNum: number;
    rows: Row[];
}

export interface Row {
    rowId: number;
    stepId: number;
    directions: string;
    rowNum: number;
}

export interface Auth {
    userId: 0,
    username: '',
    token: ''
}
