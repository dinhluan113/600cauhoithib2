import Repository from "./Repository";

const resource = "/lesson";
export default {
    Get() {
        return Repository.get(`${resource}/`, {
            crossDomain: true
        });
    }
};