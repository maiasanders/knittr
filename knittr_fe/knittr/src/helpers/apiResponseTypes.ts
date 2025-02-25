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
