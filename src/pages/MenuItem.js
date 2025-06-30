export default function MenuItem() {
	return `
        <section class="section flex-col gap-8">
            <c-title
                data-title="افزودن آیتم منو"
                data-back="true"></c-title>
            <div class="form-control">
                <form
                    novalidate
                    id="items"
                    name="items"
                    class="form">
                    <c-input
                        data-type="text"
                        data-id="title"
                        data-label="نام محصول"
                        data-tooltip="حداقل کاراکتر مجاز 30"></c-input>
                    <c-input
                        data-type="number"
                        data-id="price"
                        data-label="قیمت"
                        data-tooltip="قیمت های خود را به صورت 2 و یا 3 رقمی وارد نمایید"></c-input>
                    <c-input
                        data-type="number"
                        data-id="double-price"
                        data-label="قیمت دابل (اگر موجود است)"
                        data-tooltip="محصول فوق اگر دابل شات ندارد عدد 0 را وارد کنید"></c-input>
                    <c-select
                        data-id="category"
                        data-value="دسته بندی"></c-select>
                    <c-input
                        data-type="textarea"
                        data-id="desc"
                        data-label="توضیحات کوتاه"
                        data-tooltip="توضیح کوتاهی درباره محصول بنویسید. حداقل کاراکتر مجاز 200"></c-input>
                    <c-input
                        data-type="file"
                        data-id="image"
                        data-label="تصویر محصول"></c-input>
                    <c-button
                        data-value="ارسال"
                        data-type="submit"></c-button>
                </form>
            </div>
        </section>
    `;
}
