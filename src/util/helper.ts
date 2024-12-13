export function formateDate(date: string) {
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    return new Date(date).toLocaleDateString([], options);
}