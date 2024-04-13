export function createMatrix(matrix: (1 | 0)[][]) {

    const root = document.createElement("div");
    const matrixDom = matrix.map((elX) => {
        return elX.map((el) => {
            let divElement = document.createElement("div");
            divElement.classList.add("cells");
            if (el) divElement.classList.add("alive");

            root.appendChild(divElement);
            return divElement
        })
    });

    return {
        root,
        matrixDom
    };

}


export function makeCellAlive(element: HTMLDivElement) {
    element?.classList.add("alive");
}

export function makeCellDead(element: HTMLDivElement) {
    element?.classList.remove("alive");
}