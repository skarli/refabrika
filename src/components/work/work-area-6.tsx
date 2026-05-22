import React from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { PortfolioItem } from "@/types/sanity";

interface WorkAreaSixProps {
  projects?: PortfolioItem[];
}

export const WorksWrapperSix = ({ projects = [] }: WorkAreaSixProps) => {
  return (
    <div className="works-wrapper-6">
      {projects.map((item, index) => (
        <div className="work-box fade-anim" key={item._id || index}>
          <div className="thumb">
            <div className="image scale" data-cursor-text="View Details" data-cursor-text-red>
              <Link href={`/portfolio/${item.slug?.current}`}>
                {item.thumbnail ? (
                  <Image
                    src={urlFor(item.thumbnail).width(600).height(400).url()}
                    alt={item.title}
                    width={600}
                    height={400}
                    style={{ height: "auto" }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "3/2",
                      background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "15px",
                      color: "#e94560",
                      fontSize: "14px",
                      fontWeight: 500,
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                    }}
                  >
                    {item.tags?.[0] || "Project"}
                  </div>
                )}
              </Link>
            </div>
          </div>
          <div className="content">
            <h3 className="title">
              <Link href={`/portfolio/${item.slug?.current}`}>{item.title}</Link>
            </h3>
            <div className="meta">
              <span className="tag">{item.tags?.join(", ") || ""}</span>
              <span className="date">{item.year ? `(${item.year})` : ""}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const WorkAreaSix = ({ projects = [] }: WorkAreaSixProps) => {
  return (
    <section className="work-area-6">
      <div className="container large">
        <div className="work-area-6-inner">
          <div className="works-wrapper-box">
            <WorksWrapperSix projects={projects} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkAreaSix;
