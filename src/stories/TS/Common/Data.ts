export type TDataset = {
    label: string,
    data: number[],
    fill: boolean,
    borderColor: 'rgb(75, 192, 192)',
    tension: number
};

export type TData = {
    labels: string[],
    datasets: TDataset[]
};