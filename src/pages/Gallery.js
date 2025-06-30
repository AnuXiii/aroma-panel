export default function Gallery() {
	return `
        <section class="section flex-col gap-8">
            <c-title
                data-title="افزودن تصویر گالری"
                data-back="true"></c-title>
            <div class="form-control">
                <form
                    novalidate
                    id="gallery"
                    name="gallery"
                    class="form">
                    <c-input
                        data-type="file"
                        data-id="gallery-img"
                        data-label="تصویر خود را آپلود کنید"
                        data-tooltip="فرمت های مجاز png, jpeg, jpg"></c-input>
                    <c-select
                        data-id="col"
                        data-default="3"
                        data-value="تعداد ستون"
                        data-options='[
                            {"value": "3", "text": "3 ستون"}, 
                            {"value": "6", "text": "6 ستون"}
                        ]'></c-select>
                    <c-button
                        data-value="ارسال"
                        data-type="submit"></c-button>
                </form>
            </div>
        </section>
    `;
}
