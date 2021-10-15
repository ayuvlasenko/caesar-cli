import { resolve } from "path";

export default [
    {
        entry: resolve("src", "index.ts"),
        output: {
            path: resolve("dist"),
            filename: "index.js",
            clean: true,
        },
        mode: process.env.NODE_ENV === "development" ? "development" : "production",
        resolve: {
            extensions: [".tsx", ".ts", ".js", ".json"],
        },
        devtool: "source-map",
        target: "node",
        module: {
            rules: [{
                test: /\.ts$/i,
                loader: "ts-loader",
            }],
        },
    },
];
