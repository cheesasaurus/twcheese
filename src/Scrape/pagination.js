function scrapePageNumber() {
    let currentPage = $('#paged_view_content').children('table:eq(0)').find('strong').html();
    if (currentPage && !currentPage.includes('all')) {
        return parseInt(currentPage.match(/\d+/)[0]);
    }
    return null;
};

export { scrapePageNumber };