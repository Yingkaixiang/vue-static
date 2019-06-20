import request from "../lib/request";

export async function test() {
  return await request({
    url: "https://pokeapi.co/api/v2/pokemon/ditto/",
  });
}
