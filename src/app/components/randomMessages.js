function getRandomMessage(messages) {
    if (!messages || messages.length === 0) {
        return null;
    }
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
}

module.exports = { getRandomMessage };