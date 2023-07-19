export const Emitter = (() => {
    const events = {}

    function on(eventName, listener) {
        events[eventName] = events[eventName] || []

        events[eventName].push(listener)
    }

    function emit(eventName, ...data) {
        if (eventName in events === false) return console.log(`${eventName}: listeners not found`)

        events[eventName]
            .forEach(listener => listener(...data))
    }

    const off = (eventName, listener) =>
        events[eventName] = events[eventName]
            .filter(callBack => callBack !== listener)

    function once(eventName, listener) {
        console.log(`Emitter once event`, eventName)

        on(eventName, (...data) => {
            listener(...data)
            off(listener)
        })
    }

    return {
        on, emit, off, once,
    }
})()
