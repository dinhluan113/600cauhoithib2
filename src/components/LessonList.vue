<template>
    <div>
        <div class="row">
            <div class="grid-lstQues col colLeft">
                <a class="grid-lstQuesItem" v-bind:class="{ active: crrQuestionId === item, isspec: arrSpecial.indexOf(item) > -1 }" href="javascript:void(0)" @click="onChangeQues(item)" v-for="item in this.arrCountNumerQues" v-bind:key="item">
                    {{ item }}
                </a>
            </div>

            <div class="col">
                <div v-for="item in this.arrQuestion" v-bind:key="item.id" :value="item.id">
                    <div v-if="crrQuestionId === item.id">
                        <p class="qus">Câu {{ item.id }}: {{ item.question }}</p>
                        <p class="hot" v-if="item.isSpecial">Câu điểm liệt</p>
                        <img class="imgQus" v-if="item.imgSrc != ''" :src="item.imgSrc" />
                        <a href="javascript:void(0)" @click="answer()" class="ans" v-if="item.answer1">
                            <span class="qusDetail">1. {{ item.answer1 }}</span>
                            <div class="hideItem">
                                <span v-if="item.trueAnswer === 1" class="succ"><img src="../assets/true.png"></span>
                                <span v-else class="failed"><img src="../assets/wrong.png"></span>
                            </div>
                        </a>
                        <a href="javascript:void(0)" @click="answer()" class="ans" v-if="item.answer2">
                            <span class="qusDetail">2. {{ item.answer2 }}</span>
                            <div class="hideItem">
                                <span v-if="item.trueAnswer === 2" class="succ"><img src="../assets/true.png"></span>
                                <span v-else class="failed"><img src="../assets/wrong.png"></span>
                            </div>
                        </a>
                        <a href="javascript:void(0)" @click="answer()" class="ans" v-if="item.answer3">
                            <span class="qusDetail">3. {{ item.answer3 }}</span>
                            <div class="hideItem">
                                <span v-if="item.trueAnswer === 3" class="succ"><img src="../assets/true.png"></span>
                                <span v-else class="failed"><img src="../assets/wrong.png"></span>
                            </div>
                        </a>
                        <a href="javascript:void(0)" @click="answer()" class="ans" v-if="item.answer4">
                            <span class="qusDetail">4. {{ item.answer4 }}</span>
                            <div class="hideItem">
                                <span v-if="item.trueAnswer === 4" class="succ"><img src="../assets/true.png"></span>
                                <span v-else class="failed"><img src="../assets/wrong.png"></span>
                            </div>
                        </a>
                        <a href="javascript:void(0)" @click="answer()" class="ans" v-if="item.answer5">
                            <span class="qusDetail">5. {{ item.answer5 }}</span>
                            <div class="hideItem">
                                <span v-if="item.trueAnswer === 5" class="succ"><img src="../assets/true.png"></span>
                                <span v-else class="failed"><img src="../assets/wrong.png"></span>
                            </div>
                        </a>

                        <p class="hideItem suggest" v-if="item.suggest != ''">Gợi ý: {{ item.suggest }}</p>

                        <a href="javascript:void(0)" @click="nextQues()" id="btnNext" class="btnNext" v-bind:class="{ disabled: crrQuestionId === crrLastQuestionId}">Câu tiếp theo</a>
                    </div>
                </div>
            </div>
        </div>
        <br />
        <hr />
        <br />
        <div class="grid-container">
            <a class="grid-item" href="javascript:void(0)" @click="loadQues(0)" v-bind:class="{ active: idxLsShow === 0 }" style="justify-content: center; align-items: center; display: flex;">
                Xem tất cả
            </a>
            <a href="javascript:void(0)" @click="loadQues(item.id)" class="grid-item" v-bind:class="{ active: idxLsShow === item.id }" v-for="item in this.arrLesson" v-bind:key="item.id" :value="item.id">
                <p>{{ item.lessonName }}</p>
                <p class="note">{{ item.note }}</p>
            </a>
        </div>
    </div>
</template>

<script>
    import { RepositoryFactory } from '@/repositories/RepositoryFactory'
    const LessonRepository = RepositoryFactory.get('lesson')
    const QuestionRepository = RepositoryFactory.get('question')

    export default {
        data: function () {
            return {
                arrLesson: [],
                arrQuestion: [],
                arrCountNumerQues: [],
                crrQuestionId: 0,
                idxLsShow: 0,
                arrSpecial: [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 33, 35, 36, 37, 40, 43, 45, 46, 47, 48, 49, 50, 51, 52, 53, 84, 91, 99, 101, 109, 112, 114, 118, 119, 143, 145, 147, 150, 152, 153, 160, 199, 209, 210, 211, 214, 221, 227, 231, 242, 245, 248, 258, 260, 261, 262],
                crrLastQuestionId: 0,
            }
        },
        mounted() {
            let self = this;
            let promise = LessonRepository.Get();
            promise
                .then(function (response) {
                    if (response != null) {
                        response.data.forEach(function (obj) {
                            self.arrLesson.push(obj);
                        });
                    }
                    return response;
                })
                .then(function () {
                    self.loadQues(0);
                })
                .catch(function () {
                    alert("An error occurred, please try again later.");
                })
                .finally(function () {
                });
        },
        methods: {
            loadQues(lessonId) {
                if (lessonId === 13) {
                    this.getSpecial(lessonId);
                }
                else {
                    let self = this;
                    this.idxLsShow = lessonId;
                    let promise = QuestionRepository.Get(lessonId);
                    promise
                        .then(function (response) {
                            if (response != null) {
                                self.arrQuestion = [];
                                self.arrCountNumerQues = [];
                                self.crrQuestionId = response.data[0].id;
                                response.data.forEach(function (obj) {
                                    self.arrQuestion.push(obj);
                                    self.arrCountNumerQues.push(obj.id);
                                });
                            }
                            return response;
                        })
                        .then(function () {
                            self.crrLastQuestionId = self.arrQuestion[self.arrQuestion.length - 1].id;
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        })
                        .catch(function () {
                            alert("An error occurred, please try again later.");
                        })
                        .finally(function () {
                        });
                }
            },
            onChangeQues(idx) {
                this.crrQuestionId = idx;
            },
            nextQues() {
                if (this.crrQuestionId < this.crrLastQuestionId)
                    this.onChangeQues(this.crrQuestionId + 1);
            },
            answer() {
                var arrHide = document.getElementsByClassName("hideItem");
                arrHide.forEach(function (elm) {
                    elm.style.display = "block";
                })
            },
            getSpecial(lessonId) {
                let self = this;
                this.idxLsShow = lessonId;
                let promise = QuestionRepository.GetSpecial();
                promise
                    .then(function (response) {
                        if (response != null) {
                            self.arrQuestion = [];
                            self.arrCountNumerQues = [];
                            self.crrQuestionId = response.data[0].id;
                            response.data.forEach(function (obj) {
                                self.arrQuestion.push(obj);
                                self.arrCountNumerQues.push(obj.id);
                            });
                        }
                        return response;
                    })
                    .then(function () {

                    })
                    .catch(function () {
                        alert("An error occurred, please try again later.");
                    })
                    .finally(function () {
                    });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .note {
        font-size: 1em;
        display: block;
        margin: 5px 0 0;
        color: #666;
        font-style: italic;
    }

    .grid-container {
        display: grid;
        grid-template-columns: auto auto auto;
    }

    .grid-item {
        background-color: #eeeeee;
        padding: 3px;
        text-align: left;
        margin: 5px;
        padding: 10px 3px;
        padding-left: 11px;
    }

        .grid-item.active {
            background: #46a27a;
            color: #fff;
        }

            .grid-item.active .note {
                color: #eee;
            }

    .grid-lstQues {
        display: flex;
    }

    .grid-lstQuesItem {
        background-color: #eeeeee;
        padding: 3px;
        text-align: center;
        margin: 5px;
        padding: 3px;
        width: 28px;
        height: 28px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #eee;
        transition: all 0.3s;
    }

        .grid-lstQuesItem.isspec {
            border: 1px solid #9f224e;
            background: #9f224e;
            color: #fff;
        }

        .grid-lstQuesItem.active {
            background: #42bc85;
            border: 1px solid #42bc85;
            color: #fff;
        }

            .grid-lstQuesItem.active.isspec {
                border: 1px solid #9f224e;
                color: #9f224e;
            }

    .row {
        display: flex;
    }

    .col {
        padding: 20px;
    }

    .colLeft {
        padding-left: 0;
        height: 556px;
        overflow: hidden;
        overflow-y: scroll;
        min-width: 431px;
        max-width: 431px;
        display: block;
        text-align: left;
    }

    .qus {
        color: #333;
        font-size: 1.2em;
        font-weight: bold;
        line-height: 1.5em;
        text-align: left;
    }

    .qusDetail {
        flex: 1;
        padding: 10px 0;
    }

    .suggest {
        display: block;
        text-align: left;
        color: #666;
        margin: 25px 0 10px;
    }

    .hideItem {
        display: none;
    }

        .hideItem img {
            width: 33px;
        }

    .ans {
        display: block;
        text-align: left;
        background: #f8f8f8;
        padding-left: 15px;
        margin: 10px 0;
        display: flex;
        align-items: center;
        transition: all 0.5s;
    }

        .ans:hover {
            background: #f3f3f3;
        }

    .failed, .succ {
        padding: 0 5px;
        display: block;
    }

    .imgQus {
        max-width: 560px;
    }

    .hot {
        display: block;
        margin: 10px 0;
        text-align: left;
        color: red;
        font-style: italic;
    }

    .btnNext {
        background: #9f224e;
        color: #fff;
        display: block;
        width: 200px;
        padding: 10px 0;
    }

        .btnNext.disabled {
            background: #dcdcdc;
            color: #666;
            pointer-events: none;
        }

    @media only screen and (max-width : 990px) {
        .grid-container {
            grid-template-columns: auto auto;
        }

        .row {
            flex-direction: column;
        }

        .colLeft {
            height: unset;
            max-height: 250px;
            max-width: unset;
            min-width: unset;
        }

        .col {
            padding: 20px 0;
        }

        .imgQus {
            width: 100%;
        }
    }
</style>
