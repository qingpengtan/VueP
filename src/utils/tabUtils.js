import bus from "../components/common/bus"

export default {
    closeCurrentTab(tabs, hash, that) {
        let path = hash.slice(1, hash.length);
        tabs.forEach((tab, index) => {
            if (path == tab['path'])
                this.closeTags(index, tabs, that);
        })
    },

    // 关闭单个标签
    closeTags(index, tagsList, that) {
        const delItem = tagsList.splice(index, 1)[0];
        const item = tagsList[index] ?
            tagsList[index] :
            tagsList[index - 1];
        if (item) {
            delItem.path === that.$route.fullPath && that.$router.push(item.path);
        } else {
            that.$router.push("/sys");
        }
    },

    // 设置标签
    setTags(tagsList,that) {
        const isExist = tagsList.some(item => {
            return item.path === that.$route.fullPath;
        });
        !isExist &&
            tagsList.push({
                title: that.$route.meta.title,
                path: that.$route.fullPath,
                name: that.$route.matched[1].components.default.name
            });
        bus.$emit("tags", tagsList);
    },

}
