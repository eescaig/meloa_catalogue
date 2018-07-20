export class DatasetDetail {
    /* 
    id: string // id
    contact: string // extras - {key: "Contact", value: "Instituto Hidrográfico (IH)"}
    email: string   // extras - {key: "Contact Email", value: "mail@hidrografico.pt"}
    creationTime: Date // extras - {key: "CreationTime", value: "2018-02-23T00:00:00.000000Z"}
    topicCategory : string // extras - {key: "Topic Category", value: "oceans"}
    groups : string[] // groups - title or display_name
    tags : string[] // tags - name
    datasetName : string // name
    notes : string // notes
    title : string // title 
    */

    constructor(
        public id: string,
        public datasetName: string,
        public title: string,
        public notes: string,
        public contact: string,
        public email: string,
        public creationTime: Date,
        public topicCategory: string,
        public groups: string[],
        public tags: string[]
    ) { }
}
