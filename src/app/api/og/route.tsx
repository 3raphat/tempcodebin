import { ImageResponse } from "next/og"

export const runtime = "edge"

const fontBoldData = fetch(
  new URL("~/assets/fonts/Onest-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer())

const fontRegularData = fetch(
  new URL("~/assets/fonts/Onest-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer())

export async function GET(request: Request) {
  try {
    const [fontBold, fontRegular] = await Promise.all([
      fontBoldData,
      fontRegularData,
    ])

    const { searchParams } = new URL(request.url)

    const hasId = searchParams.has("id")
    const id = hasId ? "Code's " + searchParams.get("id") : "TempCodeBin"

    const description =
      "A temporary storage and sharing platform for code snippets with others."

    return new ImageResponse(
      (
        <div
          tw="relative flex w-full h-full"
          style={{
            background:
              "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAIAAABsjUUPAAAACXBIWXMAAC4jAAAuIwF4pT92AAAFyGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDUgNzkuMTY0NTkwLCAyMDIwLzEyLzA5LTExOjU3OjQ0ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjIuMSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDI0LTAxLTE5VDE5OjQ5OjMzKzAxOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDI0LTAxLTE5VDE5OjQ5OjMzKzAxOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyNC0wMS0xOVQxOTo0OTozMyswMTowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozNzZiODY5YS1lZThjLWIxNDYtYjBlOS05ZDA0MmUzZGFkOWEiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo1Y2YwNDFkNS0wMzliLTIwNDgtOTNmYS04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)",
          }}
        >
          <div tw="flex items-center justify-center w-full h-full absolute -top-80 -left-30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 3787 2842"
              fill="none"
            >
              <g filter="url(#filter)">
                <ellipse
                  cx="1924.71"
                  cy="273.501"
                  rx="1924.71"
                  ry="273.501"
                  transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
                  fill="rgb(244 244 245)"
                  fillOpacity="0.12"
                ></ellipse>
              </g>
              <defs>
                <filter
                  id="filter"
                  x="0.860352"
                  y="0.838989"
                  width="3785.16"
                  height="2840.26"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood
                    floodOpacity="0"
                    result="BackgroundImageFix"
                  ></feFlood>
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  ></feBlend>
                  <feGaussianBlur
                    stdDeviation="151"
                    result="effect1_foregroundBlur_1065_8"
                  ></feGaussianBlur>
                </filter>
              </defs>
            </svg>
          </div>
          <div
            tw="flex w-full h-full flex-col items-center justify-center"
            style={{
              background:
                "linear-gradient(to bottom right, transparent, black)",
            }}
          >
            <div
              tw="text-[80px] font-bold text-transparent"
              style={{
                fontFamily: "Onest",
                background:
                  "linear-gradient(to bottom right, #f4f4f5, #27272a)",
                backgroundClip: "text",
              }}
            >
              {id}
            </div>
            <div
              tw="mt-4 text-xl text-[#71717a]"
              style={{
                fontFamily: "Onest",
              }}
            >
              {description}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Onest",
            data: fontBold,
            weight: 700,
            style: "normal",
          },
          {
            name: "Onest",
            data: fontRegular,
            weight: 400,
            style: "normal",
          },
        ],
      }
    )
  } catch {
    return new Response("Failed to generate the image", {
      status: 500,
    })
  }
}
