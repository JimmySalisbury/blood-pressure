import { sleep, group } from "k6";
import http from "k6/http";

export const options = {
  ext: {
    loadimpact: {
      distribution: {
        "amazon::ie:dublin": { loadZone: "amazon::ie:dublin", percent: 100 },
      },
    },
  },
  stages: [
    { target: 20, duration: "1m" },
    { target: 20, duration: "3m30s" },
    { target: 0, duration: "1m" },
  ],
  thresholds: {
    http_req_duration: ["p(90)<200"],
  },
};

export default function main() {
  let response;

  group("page_1 - http://localhost:8100/#/home", function () {
    response = http.get("http://localhost:8100/", {
      headers: {
        dnt: "1",
        "upgrade-insecure-requests": "1",
        "sec-ch-ua":
          '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
      },
    });
  });

  // Automatically added sleep
  sleep(1);
}
