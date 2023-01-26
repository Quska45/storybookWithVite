export type TDataset = {
    label: string, // 차트의 제목
    data: number[], // labels 값에 대치 되는 그래프의 값
    fill: boolean,
    borderColor: string, // rgb(75, 192, 192)
    tension: number,
    lineWidth: number
};

export type TData = {
    labels: string[], // 차트의 x축에 해당되는 값
    datasets: TDataset[]
};