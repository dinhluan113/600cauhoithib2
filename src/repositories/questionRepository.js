import Repository from "./Repository";

const resource = "/question";
export default {
    Get(lessionId) {
        return Repository.get(`${resource}?lesson=${lessionId}`, {
            crossDomain: true
        });
    },
    GetSpecial() {
        return Repository.get(`${resource}/getspecial`, {
            crossDomain: true
        });
    }
};