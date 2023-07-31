export interface INewsListItem {
    id: number;
    title: string;
    description: string;
    publishedDate: Date;
    url: string;
    fullUrl: string;
    titleImageUrl: string;
    categoryType: string;
}

export interface INewsItem {
    id: number;
    title: string;
    description: string;
    text: string;
    publishedDate: Date;
    url: string;
    fullUrl: string;
    titleImageUrl: string;
    categoryType: string;
}