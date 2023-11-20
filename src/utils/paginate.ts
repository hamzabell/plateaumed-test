export default function paginate({ items, itemsPerPage, page }: { items: any[], itemsPerPage: number, page: number }): any[] {
    const reversedList = [...items].reverse();
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return reversedList.slice(startIndex, endIndex);
}