window.analyze = (text) => {
    const words = text.split(' ').length;
    const characters = text.length;
    const lines = text.split('\n').length;

    return {
        words,
        characters,
        lines
    }
}
