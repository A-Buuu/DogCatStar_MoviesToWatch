import { useState, useEffect } from "react";
import axios from "axios";


function App() {
  const [movies, setMovies] = useState([]);
  const sortBy = [
    { title: "熱門 (預設)", api_value: "popularity" },
    { title: "平均分數", api_value: "vote_average" },
    { title: "評分數量", api_value: "vote_count" },
    { title: "上映時間", api_value: "primary_release_date" },
  ];
  const [selectedSort, setSelectedSort] = useState("popularity");
  //預設 header 的 instance
  const tmdbAPI = axios.create({
    baseURL: import.meta.env.VITE_TMDB_API_BASE,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
    },
  });
  // 取得電影列表
  const getMovies = async (page = 1) => {
    try {
      const res = await tmdbAPI.get("/discover/movie", {
        params: {
          include_adult: false,
          include_video: false,
          language: "en-US",
          page,
          sort_by: `${selectedSort}.desc`,
        },
      });
      // console.log("Success: ", res.data);
      setMovies(res.data.results);
      setPageInfo(res.data);
    } catch (error) {
      // alert("取得電影列表失敗");
      console.log("Fail: ", error.response.data.status_message);
    }
  };
  // 取得電影列表(預設排序: 熱門)
  useEffect(() => {
    getMovies();
  }, [selectedSort]);
  // 頁面處理
  const [pageInfo, setPageInfo] = useState({});
  const handlePageChange = (page) => {
    // console.log("頁面: ", page);
    getMovies(page);
  };

  return (
    <div className="container-fluid">
      {/* 背景圖與標語 */}
      <div
        className="position-relative d-flex align-items-center justify-content-center"
        style={{ minHeight: "400px" }}
      >
        <div
          className="position-absolute"
          style={{
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundImage:
              "url(https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            backgroundPosition: "center center",
            opacity: 0.3,
          }}
        ></div>
        <div className="d-flex flex-column">
          <h1 className="fw-bold">Welcome.</h1>
          <h4 className="fw-bold">
            Millions of movies, TV shows and people to discover. Explore now.
          </h4>
        </div>
      </div>

      <div className="container mt-md-5 mt-3 mb-7">
        <div className="row">
          {/* 左側排序列表 */}
          <div className="col-md-3">
            <div
              className="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3"
              id="accordionExample"
            >
              <div className="card border-0">
                {/* 下拉選單標題 */}
                <div
                  className="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0"
                  id="headingOne"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                >
                  <div className="d-flex justify-content-between align-items-center pe-1">
                    <h5 className="mb-0">排序方式</h5>
                    <i className="fas fa-chevron-down"></i>
                  </div>
                </div>
                {/* 下拉選單列表 */}
                <div
                  id="collapseOne"
                  className="collapse"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="card-body py-0">
                    <ul className="list-unstyled">
                      {sortBy.map((sort) => (
                        <li key={sort.title}>
                          <button
                            type="button"
                            className="btn border-none py-2 d-block text-muted"
                            onClick={() => setSelectedSort(sort.api_value)}
                          >
                            {sort.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 右側產品列表 */}
          <div className="col-md-9">
            <div className="row">
              {movies.map((movie) => (
                <div className="col-md-4" key={movie.id}>
                  <div className="card border-0 mb-4 position-relative position-relative">
                    <div
                      style={{
                        width: "100%",
                        aspectRatio: "2/3", // 海報常見比例
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                            : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                        }
                        className="card-img-top rounded-0"
                        alt={movie.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>

                    <div className="card-body p-0">
                      <h4 className="mb-0 mt-3">
                        <a href="./detail.html">{movie.title}</a>
                      </h4>
                      <p className="card-text mb-3 text-muted">
                        {movie.release_date}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* 頁碼元件 */}
            <nav className="d-flex justify-content-center">
              <ul className="pagination">
                <li
                  className={`page-item ${pageInfo.page === 1 && "disabled"}`}
                >
                  <a
                    className="page-link"
                    href="#"
                    aria-label="Previous"
                    onClick={() => handlePageChange(pageInfo.page - 1)}
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                {Array.from({ length: 5 }).map((_, index) => (
                  <li
                    key={index}
                    className={`page-item ${
                      pageInfo.page === index + 1 && "active"
                    }`}
                  >
                    <a
                      className="page-link"
                      href="#"
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </a>
                  </li>
                ))}
                <li
                  className={`page-item ${pageInfo.page === 5 && "disabled"}`}
                >
                  <a
                    className="page-link"
                    href="#"
                    aria-label="Next"
                    onClick={() => handlePageChange(pageInfo.page + 1)}
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
