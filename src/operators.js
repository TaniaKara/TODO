
const obj1 = {
    constructor(){
        this.f1 = this.f1.bind(this);
    },
    name: "tania",    
    f1() {
        console.log(this.name);
    }
};

obj1.f1();


const obj2 = {
    name: "shawky",
    o: obj1
}

