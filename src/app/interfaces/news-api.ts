export interface INewsListItemResponseDto {
    id: number;
    title: string;
    description: string;
    publishedDate: string;
    url: string;
    fullUrl: string;
    titleImageUrl: string;
    categoryType: string;
}

export interface INewsListResponseDto {
    news: INewsListItemResponseDto[]
}

export interface INewsItemResponseDto {
    id: number;
    title: string;
    description: string;
    text: string;
    publishedDate: string;
    url: string;
    fullUrl: string;
    titleImageUrl: string;
    categoryType: string;
}