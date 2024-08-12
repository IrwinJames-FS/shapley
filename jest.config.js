module.exports = {
	testEnvironment: "jsdom",
	moduleNameWrapper: {
		".(css | scss)$": "identity-obj-proxy"
	}
}