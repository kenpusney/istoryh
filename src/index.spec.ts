
import { expect } from "chai"

import {isto, objstore} from "./index"


describe("Istoryh Interface", () => {
    it("should work as expected", () => {
        const store = objstore()
        const hist = isto(10, "hello", store)

        hist.push("hello");

        hist.push("world");


        for (let cnt = 1; cnt < 10; cnt ++) {
            hist.push(`item${cnt}`)
        }

        console.log(hist.top())

        console.log(hist.at(1))
        console.log(hist.at(10))

        console.log(hist.list(15));
        console.log(store)
    });
})