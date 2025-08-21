import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next"; // importa i18next
import WordPressBlogCard from "../cards/WordPressBlogCard";
import SectionArea from "../sectionElements/SectionArea";
import SectionWrapper from "../sectionElements/SectionWrapper";
import SectionHeader from "../sectionElements/SectionHeader";
import Paragraphs from "../sectionElements/Paragraphs";
import MotionDivDownToUp from "../animation/MotionDivDownToUp";
import content from "../../content/content"; // se ainda precisa para o blogLink

function BlogPosts() {
  const { t } = useTranslation(); // hook para puxar do pt.json
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(
      `https://public-api.wordpress.com/rest/v1.1/sites/${content.texts.blog.blogLink}/posts/`
    )
      .then((response) => response.json())
      .then((data) => setPosts(data.posts || []))
      .catch((error) => console.error("Erro ao buscar posts:", error));
  }, []);

  return (
    <div>
      <SectionArea className="bg-bgSectionDark" id="blog">
        <SectionWrapper>
          {/* Textos estáticos do pt.json */}
          <SectionHeader
            className="text-center"
            miniTitle={t("blog.miniTag")}
            sectionHeaderTitle={t("blog.title")}
            sectionHeaderSubtitle={t("blog.subtitle")}
            color=""
            titleColorSet="text-white"
            subtitleColorSet="text-white"
            type=""
          />

          {/* Posts da API */}
          <ul className="flex flex-wrap gap-[30px] justify-center mb-[80px]">
            {posts.slice(0, 3).map((post) => (
              <li key={post.ID}>
                <WordPressBlogCard
                  img={
                    post.featured_image && (
                      <img
                        src={post.featured_image}
                        alt="Imagem do post"
                        className="rounded-2xl"
                      />
                    )
                  }
                  title={
                    <h1 dangerouslySetInnerHTML={{ __html: post.title }} />
                  }
                  subtitle={
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          post.excerpt.length > 100
                            ? post.excerpt.substring(0, 100) + "..."
                            : post.excerpt,
                      }}
                    />
                  }
                  link={post.URL}
                />
              </li>
            ))}
          </ul>

          {/* Link também vindo do pt.json */}
          <MotionDivDownToUp>
            <Paragraphs className="text-center text-white underline transition hover:scale-110">
              <a
                href={`https://${content.texts.blog.blogLink}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("blog.label")}
              </a>
            </Paragraphs>
          </MotionDivDownToUp>
        </SectionWrapper>
      </SectionArea>
    </div>
  );
}

export default BlogPosts;
