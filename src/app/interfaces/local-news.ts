export interface ICreateLocalNewsItemDto {
    title: string;
    text: string;
    titleImageUrl: string;
}

export interface ILocalNewsItem {
    id: number;
    title: string;
    text: string;
    titleImageUrl: string;
    publishedDate: Date;
    url: string;
}