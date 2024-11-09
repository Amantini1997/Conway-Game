module.exports = {
	transform: {
	  '^.+\\.tsx?$': 'ts-jest',
	},
	transformIgnorePatterns: ['node_modules/(?!(your-module|another-module)/)'],
};
  