export function getTotalPages(totalBookMatches: number, itemsPerPage: number) {
  return Math.ceil(totalBookMatches / itemsPerPage);
}

export function getStartIndex(pageNum: number, itemsPerPage: number) {
  return (pageNum - 1) * itemsPerPage;
}

export function getPaginationNumbers(currPageNum: number, totalBookMatches: number, itemsPerPage: number) {
  const DOTS = '...';
  const totalPages = getTotalPages(totalBookMatches, itemsPerPage);
  // return an array of all page numbers with '...'s in right places

  if (totalPages <= 3) {
    const pageNums = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNums.push(i);
    }
    return pageNums;
  }

  if (currPageNum == 1 || currPageNum == 2) {
    return [1, 2, 3, DOTS, totalPages];
  }

  if (currPageNum == totalPages || currPageNum == totalPages - 1) {
    return [1, DOTS, totalPages - 1, totalPages - 2, totalPages];
  }

  return [1, DOTS, currPageNum - 1, currPageNum, currPageNum + 1, DOTS, totalPages];
}