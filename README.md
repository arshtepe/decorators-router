# decorators-router
###Alpha version
```js

@Controller("/test")
export default class {

    @RequestMapping({value: "add", method: RequestMethod.POST})
    async add(ctx) {
        await service.doAction(ctx.request.body.files);
        ctx.redirect("/plugin/list");
    }

    @RequestMapping("/")// by default method GET
    async uploadPageView({render}, params) {
        await render("upload.html");
    }

    @RequestMapping("list")
    async list(ctx) {
        return service.getList();
    }
}
```
