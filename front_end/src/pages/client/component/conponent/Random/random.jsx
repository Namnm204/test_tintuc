import React, { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import "../../../../css/SpinWheel.css";
import { Helmet } from "react-helmet";

const RandomSpinWheel = () => {
  const [segments, setSegments] = useState([]);
  const [newSegment, setNewSegment] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const [currentAngle, setCurrentAngle] = useState(0);
  const canvasRef = useRef(null);

  // Load dữ liệu từ localStorage khi ứng dụng khởi động
  useEffect(() => {
    const savedSegments = JSON.parse(localStorage.getItem("segments")) || [];
    setSegments(savedSegments);
  }, []);

  // Lưu dữ liệu vào localStorage mỗi khi segments thay đổi
  useEffect(() => {
    localStorage.setItem("segments", JSON.stringify(segments));
    drawWheel();
  }, [segments]);

  const addSegment = () => {
    if (newSegment.trim() !== "") {
      setSegments([...segments, { text: newSegment, selected: false }]);
      setNewSegment("");
    }
  };

  const editSegment = (index, newText) => {
    const updatedSegments = [...segments];
    updatedSegments[index].text = newText;
    setSegments(updatedSegments);
  };

  const removeSegment = (index) => {
    const updatedSegments = segments.filter((_, i) => i !== index);
    setSegments(updatedSegments);
  };

  const resetWheel = () => {
    const resetSegments = segments.map((segment) => ({
      ...segment,
      selected: false,
    }));
    setSegments(resetSegments);
    setWinner(null);
    setCurrentAngle(0);
  };

  const drawWheel = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (segments.length === 0) return;

    const segmentAngle = (2 * Math.PI) / segments.length;
    segments.forEach((segment, index) => {
      const startAngle = index * segmentAngle;
      const endAngle = startAngle + segmentAngle;

      // Kiểm tra trạng thái và đặt màu sắc
      let fillStyle;
      if (segment.selected) {
        fillStyle = "gray"; // Màu đen cho ô đã chọn
      } else {
        // Gradient fill cho ô chưa chọn
        const gradient = ctx.createLinearGradient(
          centerX,
          centerY,
          centerX + radius,
          centerY + radius
        );
        gradient.addColorStop(
          0,
          `hsl(${(index * 360) / segments.length}, 80%, 50%)`
        );
        gradient.addColorStop(
          1,
          `hsl(${((index + 1) * 360) / segments.length}, 80%, 70%)`
        );
        fillStyle = gradient;
      }

      // Vẽ ô
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.fillStyle = fillStyle;
      ctx.fill();
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Thêm text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + segmentAngle / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = "white";
      ctx.font = "14px Arial";
      ctx.fillText(segment.text, radius - 20, 5);
      ctx.restore();
    });

    // Thêm viền phát sáng
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.lineWidth = 6;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
    ctx.stroke();
  };

  const spinWheel = () => {
    if (segments.length === 0) {
      alert("Vui lòng thêm dữ liệu vào vòng quay!");
      return;
    }
    setSpinning(true);
    setWinner(null);

    const availableSegments = segments.filter((segment) => !segment.selected);

    if (availableSegments.length === 0) {
      alert("Tất cả các ô đã được chọn, hãy reset vòng quay để quay lại!");
      setSpinning(false);
      return;
    }

    const randomAngle = Math.random() * 360 + 3600; // Add multiple rotations
    let currentSpinAngle = currentAngle;

    const spinInterval = setInterval(() => {
      currentSpinAngle += 20;
      drawWheelAtAngle(currentSpinAngle);

      if (currentSpinAngle >= currentAngle + randomAngle) {
        clearInterval(spinInterval);
        setSpinning(false);
        const finalAngle = currentSpinAngle % 360;
        setCurrentAngle(finalAngle);

        const segmentAngle = 360 / segments.length;
        const winningIndex = Math.floor(
          (segments.length - Math.floor(finalAngle / segmentAngle)) %
            segments.length
        );

        const updatedSegments = [...segments];
        updatedSegments[winningIndex].selected = true;
        setSegments(updatedSegments);
        setWinner(updatedSegments[winningIndex].text);
      }
    }, 16);
  };

  const drawWheelAtAngle = (angle) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((angle * Math.PI) / 180);
    ctx.translate(-centerX, -centerY);
    drawWheel();
    ctx.restore();
  };

  return (
    <div className="container mx-auto px-4">
      <Helmet>
        <title>🎡 Vòng Quay May Mắn - Quay Số Trúng Thưởng Miễn Phí</title>
        <meta
          name="description"
          content="Thử vận may với vòng quay ngẫu nhiên. Quay số trúng thưởng miễn phí, chơi ngay hôm nay!"
        />
        <meta
          name="keywords"
          content="vòng quay may mắn, quay số trúng thưởng, random spin wheel, game online miễn phí"
        />
      </Helmet>
      <h1 className="text-2xl md:text-3xl font-bold text-center my-4">
        🎡 Vòng Quay May Mắn 🎉
      </h1>
      {/* Kết quả */}
      {winner && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
            <Confetti />
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Kết quả: {winner} 🎉
            </h2>
            <button
              onClick={() => setWinner(null)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Canvas vòng quay */}
        <div className="md:col-span-2 relative">
          <canvas
            ref={canvasRef}
            width={600}
            height={600}
            className="mx-auto max-w-full"
          />
          <div className="absolute inset-0 flex justify-center items-center">
            <button
              onClick={spinWheel}
              disabled={spinning}
              className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 disabled:bg-gray-400"
            >
              Quay
            </button>
          </div>
        </div>

        {/* Dữ liệu bảng */}
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">
            🎡 Dữ liệu vòng quay
          </h2>
          {/* Input và nút thêm */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <input
              type="text"
              value={newSegment}
              onChange={(e) => setNewSegment(e.target.value)}
              placeholder="Nhập dữ liệu"
              disabled={spinning}
              className="flex-grow w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
            />
            <button
              onClick={addSegment}
              disabled={spinning}
              className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
            >
              Thêm
            </button>
          </div>
          {/* Danh sách dữ liệu */}
          {segments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {segments.map((segment, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-4 rounded-lg shadow-md ${
                    segment.selected ? "bg-gray-200" : "bg-gray-50"
                  }`}
                >
                  <input
                    type="text"
                    value={segment.text}
                    onChange={(e) => editSegment(index, e.target.value)}
                    disabled={spinning || segment.selected}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition-all duration-200 ${
                      segment.selected
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-white focus:ring-2 focus:ring-blue-500"
                    }`}
                  />

                  <button
                    onClick={() => removeSegment(index)}
                    disabled={spinning}
                    className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 disabled:bg-gray-400"
                  >
                    Xóa
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mt-4 text-center">
              Chưa có dữ liệu, hãy thêm mới để bắt đầu!
            </p>
          )}
          <button
            onClick={resetWheel}
            disabled={spinning}
            className="w-full mt-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-400"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default RandomSpinWheel;
