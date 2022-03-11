export default class Utils {
    static pagination(data, callback) {
        return {
            onChange: current => {
                callback(current);
            },
            current: data.page,
            pageSize: data.page_size,
            total: data.total,
            showTotal: () => {
                return `共 ${data.total} 条`
            },
            // showQuickJumper: true
        }
    }
}