# VanBanAI

**VanBanAI** là đề án xây dựng nền tảng AI hỗ trợ soạn thảo văn bản tiếng Việt. Mục tiêu là chuyển mô tả tự nhiên của người dùng thành bản dự thảo có cấu trúc, có căn cứ phù hợp và có thể xuất ra Word hoặc PDF — nhưng vẫn để con người kiểm tra và quyết định nội dung cuối cùng.

**VanBanAI** is a project proposal for an AI-assisted Vietnamese document drafting platform. It aims to turn a user's natural-language description into a structured, source-aware draft that can be exported to Word or PDF, while keeping a human in control of review and approval.

[Tiếng Việt](#tiếng-việt) · [English](#english)

## Tiếng Việt

### Bối cảnh và tổng quan tài liệu

Người dùng phổ thông thường không chắc cần cung cấp thông tin nào, văn bản cần có cấu trúc gì và định dạng nào áp dụng. Mô hình ngôn ngữ có thể viết trôi chảy nhưng vẫn thiếu dữ kiện, viện dẫn sai hoặc tạo nội dung không phù hợp. Định dạng đẹp hay đầu ra DOCX/PDF tự nó cũng không chứng minh văn bản có giá trị pháp lý.

Proposal ban đầu khảo sát một số công cụ trong nước và quốc tế, từ đó nêu giả thuyết về nhu cầu bản địa hóa cho tiếng Việt và quy tắc văn bản Việt Nam. Đây là nhận định trong phạm vi khảo sát của proposal, không phải kết luận thị trường hiện tại hay một khảo sát cạnh tranh đầy đủ.

Literature review rút ra các điểm chính:

- **Quy tắc phụ thuộc loại văn bản.** Nghị định 30/2020/NĐ-CP là căn cứ về công tác văn thư và thể thức văn bản hành chính trong phạm vi áp dụng; không nên dùng một mẫu chung cho mọi hợp đồng dân sự. Hợp đồng còn phụ thuộc loại giao dịch và quy định liên quan. Bản do hệ thống tạo vẫn là dự thảo, không thay thế thẩm quyền, chữ ký hoặc quy trình pháp lý.
- **LLM có rủi ro sai nội dung.** Dahl và cộng sự (2024) báo cáo tỷ lệ ảo giác 58% với GPT‑4 và 88% với Llama 2 trong các tác vụ về án lệ liên bang Hoa Kỳ. Magesh và cộng sự (2025) ghi nhận câu trả lời sai hoặc gây hiểu lầm trong khoảng 17–33% trên bộ đánh giá một số công cụ nghiên cứu pháp lý thương mại. Đây là kết quả của các nghiên cứu và bộ thử nghiệm đó, không phải tỷ lệ lỗi của VanBanAI hay văn bản pháp luật Việt Nam.
- **Tiếng Việt cần được đánh giá riêng.** PhoBERT, ALQAC và các nghiên cứu truy hồi/mô hình pháp lý tiếng Việt cho thấy lĩnh vực này đang phát triển; kết quả NLP tiếng Việt hoặc tiếng Anh không tự chứng minh chất lượng soạn thảo văn bản đầu-cuối.
- **Kiến trúc lai phù hợp hơn cho đề án.** Mẫu cố định dễ kiểm soát nhưng hạn chế nội dung mới; LLM sinh tự do linh hoạt nhưng khó bảo đảm cấu trúc. Đề án chọn cách kết hợp: mô hình tạo nội dung theo lược đồ, phần mềm kiểm tra dữ liệu và quy tắc, bộ dựng tệp kiểm soát định dạng, người dùng duyệt trước khi xuất. JSON hợp lệ không đồng nghĩa với nội dung đúng. Truy xuất nguồn (RAG) cũng không bảo đảm nguồn được chọn là đúng, còn hiệu lực hay đủ căn cứ.
- **Phát triển theo từng phần.** Báo cáo chọn phát triển gia tăng, dùng bản mẫu sớm để kiểm chứng chất lượng, cùng các thực hành gọn như lập kế hoạch, xem lại kết quả và ghi nhận tiến độ theo vòng lặp.

### Mục tiêu và luồng dự kiến

1. Nhận diện loại văn bản và thu thập dữ kiện người dùng cung cấp.
2. Hỏi lại khi thiếu hoặc mâu thuẫn thông tin; không tự điền dữ kiện chưa biết.
3. Tìm mẫu và nguồn phù hợp, giữ thông tin nguồn và trạng thái kiểm chứng.
4. Tạo bản nháp có cấu trúc; kiểm tra trường bắt buộc, mâu thuẫn, nội dung thiếu căn cứ và ý bị lặp.
5. Cho người dùng xem, sửa và duyệt bản nháp.
6. Dựng DOCX theo quy tắc của từng loại văn bản; chuyển PDF và kiểm tra hiển thị trước khi giao.

### Phạm vi đề xuất

- **Trọng tâm:** luồng từ thông tin đầu vào đến bản nháp có căn cứ, kiểm tra ngữ nghĩa, duyệt và xuất Word/PDF.
- **Ví dụ ban đầu:** biên bản bàn giao thiết bị và hợp đồng dịch vụ phần mềm.
- **Mở rộng SaaS trong proposal:** tài khoản, quản lý văn bản và mẫu, lịch sử phiên bản, tìm kiếm, chia sẻ, quota và trang quản trị. Đây là phạm vi đề xuất, không phải tuyên bố rằng các chức năng đã hoàn thành.

### Hướng kỹ thuật trong tài liệu

Proposal đề xuất Vue 3/Nuxt 3, Node.js/Express, MongoDB Atlas, API mô hình ngôn ngữ, JSON có cấu trúc, docx.js, lưu trữ đối tượng, xác thực và Docker. Báo cáo sau đó chọn LibreOffice chạy headless để chuyển DOCX sang PDF, nhằm dùng lại bố cục DOCX đã dựng. Đây là lựa chọn thiết kế trong tài liệu; README này không khẳng định các công nghệ hoặc chức năng đó đã có trong repo public.

### Đánh giá và giới hạn

Chất lượng cần được đánh giá riêng ở các bước: đủ thông tin, truy hồi đúng nguồn, không thêm dữ kiện, phát hiện nội dung trùng nghĩa, tuân thủ lược đồ và quy tắc thể thức, cùng khả năng hiển thị từng trang DOCX/PDF. Các kiểm tra tự động chỉ xác nhận những quy tắc đã mã hóa; chúng không chứng nhận tính đúng pháp lý. Dữ liệu ví dụ và kiểm thử nên dùng người, tổ chức và tình huống giả.

### Trạng thái repo

Repo public hiện chứa phần giới thiệu và hướng dẫn đóng góp trong [CONTRIBUTING.md](CONTRIBUTING.md). Mã nguồn ứng dụng, kết quả kiểm thử và nghiệm thu chưa được đưa vào repo này; vì vậy nội dung trên mô tả cơ sở nghiên cứu và phạm vi đề xuất, không phải danh sách tính năng đã triển khai.

## English

### Background and literature review

Non-expert users may not know which facts a document requires, how it should be structured, or which formatting rules apply. Language models can produce fluent text while omitting facts, using unsuitable references, or introducing unsupported content. A polished DOCX or PDF does not by itself establish legal validity.

The initial proposal compared a selection of Vietnamese and international tools and suggested a possible localization need for Vietnamese language and document rules. That is a hypothesis from the proposal's limited market scan, not a current or exhaustive market conclusion.

The literature review highlights five points:

- **Rules depend on document type.** Decree 30/2020/ND-CP concerns clerical work and administrative-document formalities within its scope; it is not one universal template for all private contracts. Contract requirements depend on the transaction and applicable rules. Generated files remain drafts and do not replace authority, signatures, or legal process.
- **LLMs can be factually wrong.** Dahl et al. (2024) reported hallucination rates of 58% for GPT‑4 and 88% for Llama 2 across tasks involving US federal case law. Magesh et al. (2025) found incorrect or misleading answers in roughly 17–33% of their evaluation of selected commercial legal-research tools. These figures describe those studies and test sets, not VanBanAI or Vietnamese legal drafting.
- **Vietnamese NLP needs its own evaluation.** PhoBERT, ALQAC, and Vietnamese legal retrieval/model research show ongoing progress; results on Vietnamese NLP or English legal tasks do not establish end-to-end drafting quality.
- **A constrained hybrid is the chosen direction.** Templates are controllable but limit new content; unconstrained generation is flexible but difficult to format reliably. The proposal combines structured model output, software validation, deterministic document rendering, and human review. Valid JSON does not mean correct content, and retrieval-augmented generation (RAG) does not guarantee that a retrieved source is authoritative, current, or sufficient.
- **Development is incremental.** The report favors incremental delivery, early prototypes to test quality assumptions, and lightweight planning, review, and progress records for each iteration.

### Goal and proposed workflow

1. Identify the document type and collect facts supplied by the user.
2. Ask follow-up questions when information is missing or conflicting; do not invent unknown facts.
3. Retrieve relevant templates and sources, preserving source and verification metadata.
4. Generate a structured draft and check required fields, conflicts, unsupported claims, and semantic duplication.
5. Let the user review, edit, and approve the draft.
6. Render a DOCX using rules for that document type, convert it to PDF, and inspect page layout before delivery.

### Proposed scope

- **Core:** move from user input to a grounded draft, semantic checks, human review, and Word/PDF export.
- **Initial examples:** an equipment handover record and a software services agreement.
- **Broader SaaS proposal:** accounts, document and template management, version history, search, sharing, quotas, and an administration area. These are proposed scope, not claims of completed functionality.

### Technical direction in the documents

The proposal names Vue 3/Nuxt 3, Node.js/Express, MongoDB Atlas, a language-model API, structured JSON, docx.js, object storage, authentication, and Docker. The later report prefers headless LibreOffice for DOCX-to-PDF conversion so the PDF reuses the rendered DOCX layout. These are design choices in the documents; this README does not claim they are present in the public repository.

### Evaluation and limitations

Evaluation should separately cover information completeness, retrieval quality, unsupported facts, semantic duplicates, schema and formatting rules, and page-by-page DOCX/PDF rendering. Automated checks can only verify encoded rules; they cannot certify legal correctness. Examples and tests should use synthetic people, organizations, and cases.

### Repository status

This public repository currently contains the project overview and [contribution guidelines](CONTRIBUTING.md). Application source code, test results, and acceptance evidence are not included here. The sections above summarize the research basis and proposal; they are not a list of implemented features.

## Tài liệu tham khảo / References

- Chính phủ Việt Nam, [Nghị định 30/2020/NĐ-CP về công tác văn thư](https://vanban.chinhphu.vn/default.aspx?docid=199378&pageid=27160).
- Quốc hội Việt Nam, [Bộ luật Dân sự số 91/2015/QH13](https://vanban.chinhphu.vn/default.aspx?docid=183188&pageid=27160).
- Dahl et al. (2024), [Large Legal Fictions](https://doi.org/10.1093/jla/laae003).
- Magesh et al. (2025), [Hallucination-Free?](https://doi.org/10.1111/jels.12413).
- Nguyen & Nguyen (2020), [PhoBERT](https://aclanthology.org/2020.findings-emnlp.92/); Nguyen et al. (2026), [ViLegalLM](https://aclanthology.org/2026.findings-acl.1801/).
- Lewis et al. (2020), [Retrieval-Augmented Generation](https://proceedings.neurips.cc/paper/2020/hash/6b493230205f780e1bc26945df7481e5-Abstract.html); Koo et al. (2024), [Automata-based constrained decoding](https://openreview.net/forum?id=BDBdblmyzY).

This README is a short project overview based on the local proposal and final report. It does not replace either document or claim legal, production, or user-acceptance approval.
